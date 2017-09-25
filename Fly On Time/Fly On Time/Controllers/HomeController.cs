using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Web.Mvc;
using Fly_On_Time.Utilities;

namespace Fly_On_Time.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            
            return View();
        }

        public JsonResult getTsaCheckpoint(string shortcode)
        {
            WebClient client = new WebClient();
            string information = client.DownloadString("http://apps.tsa.dhs.gov/mytsawebservice/GetAirportCheckpoints.ashx?ap=" + shortcode);

            return Json(information, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult getFlightSchedule(string airCode, string fn, string year, string month, string day)
        {
            string requestUrl = ApiKeys.fsScheduledFlightsByCarrierFNDate + airCode + "/" + fn + "/departing/" + year + "/" + month + "/" + day + "?appId=" + ApiKeys.fsAppID + "&appKey=+" + ApiKeys.fsAppKey;

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl);

            return Json(information, JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}