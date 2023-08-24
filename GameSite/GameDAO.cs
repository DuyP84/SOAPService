using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Configuration;
using System.Data.SqlClient;


namespace GameSite

{
    internal class GameDAO
    {
        MyDBDataContext db = new MyDBDataContext(ConfigurationManager.ConnectionStrings["strCon"].ConnectionString);

        public List<Game> SellectAll()
        {
            db.ObjectTrackingEnabled = false;
            List<Game> games = db.Games.ToList();
            return games;

        }

        public Game SelectByCode(int ID)
        {
            db.ObjectTrackingEnabled = false;
            Game game = db.Games.SingleOrDefault(x => x.ID == ID);
            return game;
        }

        public List<Game> SelectByKeyword(string keyword)
        {

            db.ObjectTrackingEnabled = false;
            List<Game> games = db.Games.Where(b => b.Name.Contains(keyword)).ToList();
            return games;
        }

        public bool Insert(Game newGame)
        {


            try
            {
                db.Games.InsertOnSubmit(newGame);
                db.SubmitChanges();
                return true;
            }
            catch { return false; }
        }

        public bool Update(Game newGame)
        {


            Game dbgame = db.Games.SingleOrDefault(b => b.ID == newGame.ID);
            if (dbgame != null)
            {
                try
                {
                    dbgame.Name = newGame.Name;
                    dbgame.Genre = newGame.Genre;
                    dbgame.Producer = newGame.Producer;
                    dbgame.Price = newGame.Price;
                    db.SubmitChanges();
                    return true;
                }
                catch { return false; }
            }
            return false;
        }

        public bool Delete(int ID)
        {


            Game dbgame = db.Games.SingleOrDefault(b => b.ID == ID);
            if (dbgame != null)
            {
                try
                {
                    db.Games.DeleteOnSubmit(dbgame);
                    db.SubmitChanges();
                    return true;
                }
                catch { return false; }
            }
            return false;
        }
    }
}
