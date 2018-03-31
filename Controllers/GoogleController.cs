using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReactRedux.Api.Google_Maps;
using Microsoft.AspNetCore.Mvc;

namespace CoreReactRedux.Controllers
{
    [Route("api")]
    public class GoogleController : Controller
    {
        private GoogleService _service;


        public GoogleController()
        {
            _service = new GoogleService();
        }

        [HttpPost("[action]")]
        public async void Google()
        {
            var result = await _service.GoogleRequest();
            if (result.Item1)
            {

            }
            else
            {

            }
        }
    }
}