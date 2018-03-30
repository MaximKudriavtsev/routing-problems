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
    [Route("[controller]")]
    public class ApiController : Controller
    {
        private readonly DataBaseContext _context;
        static private JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            NullValueHandling = NullValueHandling.Ignore,
        };

        public ApiController(DataBaseContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<string> GetParentsList()
        {
            var parentsList = await _context.GetAllParents();

            var result = parentsList.Select(f => new DataClassParentView()
                                                {
                                                    Data = f.Data,
                                                    ParentId = f.ParentId
                                                });

            return JsonConvert.SerializeObject(result, JsonSettings);
        }

        [HttpGet("[action]")]
        public async Task<string> GetChildsList(int parentId)
        {
            var parentsList = await _context.GetAllChildrens(parentId);

            var result = parentsList.Select(c => new DataClassChildView()
                                                {
                                                    Data = c.Data,
                                                    ChildId = c.ChildId
                                                });

            return JsonConvert.SerializeObject(result, JsonSettings);
        }

        [HttpPost("[action]")]
        public async Task<string> PostParent([FromBody] DataClassParentView data)
        {
            var result = await _context.AddParent(data);

            return JsonConvert.SerializeObject(result, JsonSettings);
        }
    }
}
