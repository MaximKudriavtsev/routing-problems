using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CoreReactRedux.Models;
using Newtonsoft.Json;
using CoreReactRedux.Models.ModelsView;

namespace CoreReactRedux.Controllers
{
    [Route("api")]
    public class GoogleMapsController : Controller
    {
        private readonly DataBaseContext _context;
        static private JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            NullValueHandling = NullValueHandling.Ignore,
        };

        public GoogleMapsController(DataBaseContext context)
        {
            _context = context;
        }
    }
}
