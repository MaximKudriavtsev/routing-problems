using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using CoreReactRedux.Api.Google_Maps;

namespace CoreReactRedux.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options) { }

        public DbSet<Unit> Units { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Point> Points { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //}

        //public async Task<Unit> CreateNewUnit()
        //{
        //    throw new NotImplementedException();
        //}

        public void GetUnit()
        {
            throw new NotImplementedException();
        }

        public void AddNewPoint(string from, string to, int volume)
        {
            var order = Orders.OrderBy(o => o.OrderId).FirstOrDefault();

            if (order == null)
            {
                order = new Order()
                {
                    Cache = JsonConvert.SerializeObject(new List<List<int>>
                        {
                            new List<int>() { 0 }
                        })
                };

                Orders.Add(order);

                SaveChanges();
            }

            Entry(order).Collection(o => o.Points).Load();

            var point = new Point()
            {
                From = from,
                To = to,
                Volume = order.Points.Count() + 1,

            };
            order.Points.Add(point);

            SaveChanges();

            UpdateCache(order, point);
        }

        public List<JsonResponse> CalcResult(List<int> source)
        {
            var half = source.Count / 2;
            var result = new List<JsonResponse>();

            var unit = Units.OrderBy(u => u.UnitId).First();

            var order = Orders.OrderBy(o => o.OrderId).First();
            Entry(order).Collection(o => o.Points).Load();

            var points = order.Points;

            var start = unit.Origin;
            for(int i = 0; i < source.Count - 1; i++)
            {
                var dot = source[i] - half;
                var point = points.First(p => p.Index.Equals(Math.Abs(dot)));

                result.Add(new JsonResponse()
                {
                    from = start,
                    to = dot <= 0 ? point.To : point.From
                });

                start = result.Last().to;
            }

            result.Add(new JsonResponse()
            {
                from = start,
                to = unit.Origin
            });

            return result;
        }

        public void UpdateCache(Order order, Point point)
        {
            var cache = JsonConvert.DeserializeObject<List<List<int>>>(order.Cache);

            var tmp = new List<int>();

            cache.Insert(1, new List<int>());
            cache.Add(new List<int>());

            List<int> source;
            //set old columns 
            for (int i = 0, j = cache.Count - 1; i < cache.Count - 1; i++)
            {
                if (i == 1) continue;

                source = cache[i];

                if (i == 0)
                {
                    var origin = Units.OrderBy(u => u.UnitId).First().Origin;
                    source.Insert(1, Convert.ToInt32((GoogleService.GoogleRequest(origin, point.To)).Item2));

                    source.Add(Convert.ToInt32((GoogleService.GoogleRequest(origin, point.From)).Item2));

                    continue;
                }
                var dbPoint = Points.First(p => p.Index.Equals(i));
                if (i <= cache.Count / 2)
                {
                    source.Insert(1, Convert.ToInt32((GoogleService.GoogleRequest(dbPoint.To, point.To)).Item2));

                    source.Add(Convert.ToInt32((GoogleService.GoogleRequest(dbPoint.To, point.From)).Item2));
                    j--;
                }
                else
                {
                    source.Insert(1, Convert.ToInt32((GoogleService.GoogleRequest(dbPoint.From, point.To)).Item2));

                    source.Add(Convert.ToInt32((GoogleService.GoogleRequest(dbPoint.From, point.From)).Item2));
                    j++;
                }
            }
            //END set old columns

            //set new columns
            source = cache[1];
            for (int i = 0; i < cache.Count - 1; i++)
            {
                if (i == 1)
                {
                    source.Add(0);
                    continue;
                }
                var dist = cache[i][1];
                source.Add(dist);
            }
            source.Add(Convert.ToInt32((GoogleService.GoogleRequest(point.From, point.To)).Item2));

            source = cache[cache.Count - 1];
            for (int i = 0; i < cache.Count - 1; i++)
            {
                var dist = cache[i][cache.Count - 1];
                source.Add(dist);
            }
            source.Add(0);

            //END set new columns
            order.Cache = JsonConvert.SerializeObject(cache);

            this.SaveChanges();
        }

        public ValueTuple<List<int>, string> GetTableString()
        {
            var unit = Units.First();

            var order = Orders.OrderBy(o => o.OrderId).First();
            Entry(order).Collection(o => o.Points).Load();

            var points = order.Points.OrderBy(o => o.Index).ToList();

            List<int> volumes = new List<int>() { unit.Volume };

            for (int i = 0; i < points.Count; i++)
            {
                volumes.Add(points[i].Volume);
                volumes.Insert(1, -points[i].Volume);
            }

            return (volumes, order.Cache);
        }

        public void Cleane()
        {
            Units.RemoveRange(Units.ToList());
            Orders.RemoveRange(Orders.ToList());
            Points.RemoveRange(Points.ToList());
        }
    }
    public class Unit
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UnitId { get; set; }
        [Required]
        public int Volume { get; set; }
        [Required]
        public string Origin { get; set; }
    }
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        [Required]
        public string Cache { get; set; }
        //children
        public Order() { Points = new List<Point>(); }
        public ICollection<Point> Points { get; set; }
    }
    public class Point
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PointId { get; set; }
        [Required, ForeignKey(nameof(Order))]
        public int OrderId { get; set; }

        [Required, MaxLength(40)]
        public string From { get; set; }
        [Required, MaxLength(40)]
        public string To { get; set; }
        [Required]
        public int Volume { get; set; }
        [Required]
        public int Index { get; set; }
        //parent
        public Order Order { get; set; }
    }
    public class JsonRequest
    {
        public int id { get; set; }
        public string from { get; set; }
        public string to { get; set; }
        public string volume { get; set; }
    }
    public class JsonResponse
    {
        public string from { get; set; }
        public string to { get; set; }
    }
}
