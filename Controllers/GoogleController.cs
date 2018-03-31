using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactRedux.Api.Google_Maps;
using Microsoft.AspNetCore.Mvc;
using CoreReactRedux.Models;

namespace CoreReactRedux.Controllers
{
    [Route("api")]
    public class GoogleController : Controller
    {
        private DataBaseContext _db;

        public GoogleController([FromServices] DataBaseContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        public void AddPoint([FromQuery] string from, [FromQuery] string to, [FromQuery] int volume)
        {
            _db.AddNewPoint(from, to, volume);
        }

        [HttpGet("[action]")]
        public void Clean()
        {
            _db.Cleane();
        }
    }
}