using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Configuration;

namespace GameSite
{
    class GameBUS 
    {
        

        public List<Game> GetAll()
        {
            List<Game> games = new GameDAO().SellectAll();
            return games;
        }

        public Game GetDetails(int ID)
        {
            Game game = new GameDAO().SelectByCode(ID);
            return game;
        }

        public List<Game> Search(String keyword)
        {
            List<Game> games = new GameDAO().SelectByKeyword(keyword);
            return games;
        }

        public bool AddNew(Game newGame)
        {
            bool result = new GameDAO().Insert(newGame);
            return result;
        }

        public bool Update(Game newGame)
        {
            bool result = new GameDAO().Update(newGame);
            return result;
        }

        public bool Delete(int ID)
        {
            bool result = new GameDAO().Delete(ID);
            return result;
        }
    }
}
