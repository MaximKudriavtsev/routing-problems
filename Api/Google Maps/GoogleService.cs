using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace CoreReactRedux.Api.Google_Maps
{
    public static class GoogleService
    {
        private static string _key = "AIzaSyB-PtpIcRabdr28ggUuqCsfE4GGjrZYWi0";

        public static ValueTuple<bool, string> GoogleRequest(string from, string to)
        {
            return GoogleRequestAsync(from, to).GetAwaiter().GetResult();
        }

        private static async Task<ValueTuple<bool, string>> GoogleRequestAsync(string from, string to)
        {
            using (var req = new HttpClient())
            {
                var res = await req.GetAsync($"https://maps.googleapis.com/maps/api/directions/json?origin={from}&destination={to}&key={_key}");
                var resString = await res.Content.ReadAsStringAsync();
                var resJson = JObject.Parse(resString);

                var failed = resJson.TryGetValue("error_message", out JToken failureMassege);
                if (failed)
                {
                    return (false, failureMassege.ToString());
                }

                var resStatus = resJson["geocoded_waypoints"];
                var resResult = resJson["routes"][0]["legs"][0];

                if (!resStatus[0]["geocoder_status"].ToString().Equals("OK") || !resStatus[1]["geocoder_status"].ToString().Equals("OK"))
                {
                    return (false, "geocoder status is false");
                }

                var distanse = resResult["distance"]["value"].ToString();

                return (true, distanse);
            }
        }
    }
}
