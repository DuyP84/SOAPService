using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace GameSite
{
    /// <summary>
    /// Summary description for GameService
    /// </summary>
    [WebService(Namespace = "http://duybua.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class GameService : System.Web.Services.WebService
    {
        [WebMethod]
        public List<Game> GetAll()
        {
            List<Game> games = new GameDAO().SellectAll();
            return games;
        }
        [WebMethod]
        public Game GetDetails(int ID)
        {
            Game game = new GameDAO().SelectByCode(ID);
            return game;
        }
        [WebMethod]
        public List<Game> Search(String keyword)
        {
            List<Game> games = new GameDAO().SelectByKeyword(keyword);
            return games;
        }
        [WebMethod]
        public bool AddNew(Game newGame)
        {
            bool result = new GameDAO().Insert(newGame);
            return result;
        }
        [WebMethod]
        public bool Update(Game newGame)
        {
            bool result = new GameDAO().Update(newGame);
            return result;
        }
        [WebMethod]
        public bool Delete(int ID)
        {
            bool result = new GameDAO().Delete(ID);
            return result;
        }
    }
}
