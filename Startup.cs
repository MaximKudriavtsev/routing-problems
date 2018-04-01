using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactRedux.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CoreReactRedux
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void CreateFirst(IServiceProvider serviceProvider)
        {
            using (var db = serviceProvider.GetRequiredService<DataBaseContext>())
            {
                db.Database.Migrate();
                db.Cleane();
                var unitFromDb = db.Units.OrderBy(u => u.UnitId).FirstOrDefault();
                if (unitFromDb == null)
                {
                    var unitsConfig = Configuration.GetSection("units").GetChildren();
                    foreach (var unitConfig in unitsConfig)
                    {
                        var unit = new Unit()
                        {
                            Origin = unitConfig["origin"],
                            Volume = Convert.ToInt32(unitConfig["volume"])
                        };
                        db.Units.Add(unit);
                    }
                    db.SaveChanges();
                }
            }
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataBaseContext>(options => {
                options.UseSqlServer(Configuration.GetConnectionString("MyDataBase"));
            });

            var serviceProvider = services.BuildServiceProvider();
            CreateFirst(serviceProvider);

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                Console.WriteLine("\n\n\nDebug Version\n\n\n");

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
