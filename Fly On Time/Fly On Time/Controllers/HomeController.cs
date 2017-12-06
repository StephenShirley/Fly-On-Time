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

        public JsonResult getFlightSchedule(string airCode, string fn, string year, string month, string day)
        {
            string requestUrl = ApiKeys.fsScheduledFlightsByCarrierFNDate + airCode + "/" + fn + "/departing/" + year + "/" + month + "/" + day + "?appId=" + ApiKeys.fsAppID + "&appKey=+" + ApiKeys.fsAppKey;

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl);

            return Json(information, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getFlightStatus(string airCode, string fn, string year, string month, string day, string airportSC)
        {
            //requestUrl = System.Web.HttpUtility.UrlEncode(requestUrl); 
            string requestUrl = ApiKeys.fsFlightStatusByArrivalDate + airCode + "/" + fn + "/arr/" + year + "/" + month + "/" + day + "?appId=" + ApiKeys.fsAppID + "&appKey=+" + ApiKeys.fsAppKey + "&utc=true&airport=" + airportSC;

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl); 
            return Json(information, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getWeatherByCoordinates(string latitude, string longitude)
        {
            string requestUrl = ApiKeys.owmAppURL + "/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + ApiKeys.owmAppKey + "&units=imperial";
            //requestUrl = System.Web.HttpUtility.UrlEncode(requestUrl);

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl);

            return Json(information, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getWeatherByAirport(string airportCode)
        {
            string requestUrl = ApiKeys.fsWeather + airportCode + "?appId=" + ApiKeys.fsAppID + "&appKey=+" + ApiKeys.fsAppKey;

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl);

            return Json(information, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getTravelEstimation(string originLat, string originLng, string destLatitude, string destLongitude)
        {

            string requestUrl = ApiKeys.googleMapsAppURL + "/maps/api/distancematrix/json?units=imperial&origins=" 
                    + originLat+ "," + originLng + "&destinations=" + destLatitude + "," + destLongitude + "&key=" + ApiKeys.googleMapsAppKey;

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl);

            return Json(information, JsonRequestBehavior.AllowGet);   
        }

        public JsonResult getFlightDelayIndexByAirport(string airportCode)
        {
            string requestUrl = ApiKeys.fsDelayIndex + airportCode + "?appId=" + ApiKeys.fsAppID + "&appKey=+" + ApiKeys.fsAppKey;

            WebClient client = new WebClient();
            string information = client.DownloadString(requestUrl);

            return Json(information, JsonRequestBehavior.AllowGet);
        }
    }
}