using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactRedux.Api.Google_Maps;
using Microsoft.AspNetCore.Mvc;
using CoreReactRedux.Models;
using Newtonsoft.Json;
using CoreReactRedux.Algoritm;
using Newtonsoft.Json.Linq;

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

        [HttpPost("[action]")]
        public string AddPoint([FromBody] List<JsonRequest> json)
        {
            foreach (var item in json)
                _db.AddNewPoint(item.from, item.to, Convert.ToInt32(item.volume));

            var tuple = _db.GetTableString();
            var table = JsonConvert.DeserializeObject<List<List<int>>>(tuple.Item2);

            var result = new CalcTable(table, tuple.Item1).CalcOutValues();

            var response = _db.CalcResult(result);
            _db.Cleane();
            return JsonConvert.SerializeObject(response);
        }

        [HttpGet("[action]")]
        public void Clean()
        {
            _db.Cleane();
        }
    }
}