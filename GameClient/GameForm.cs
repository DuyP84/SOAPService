using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GameClient
{
    public partial class GameForm : Form
    {
        bsite.GameService gameService = new bsite.GameService();
        public GameForm()
        {
            InitializeComponent();
        }

        private void GameForm_Load(object sender, EventArgs e)
        {
            List<bsite.Game> games = gameService.GetAll().ToList();
            dgvGame.DataSource = games;
        }

        private void dgvGame_SelectionChanged(object sender, EventArgs e)
        {
            if (dgvGame.SelectedRows.Count > 0)
            {
                int ID = int.Parse(dgvGame.SelectedRows[0].Cells["ID"].Value.ToString());
                bsite.Game game = gameService.GetDetails(ID);
                if (game != null)
                {
                    txtID.Text = game.ID.ToString();
                    txtName.Text = game.Name;
                    txtGenre.Text = game.Genre;
                    txtProducer.Text = game.Producer;
                    txtPrice.Text = game.Price.ToString();
                }
            }
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {
            String keyword = txtKeyword.Text.Trim();
            List<bsite.Game> games =  gameService.Search(keyword).ToList();
            dgvGame.DataSource = games;
        }

        

        private void btnAdd_Click(object sender, EventArgs e)
        {
            bsite.Game newGame = new bsite.Game()
            {
                ID = int.Parse(txtID.Text.Trim()),
                Name = txtName.Text.Trim(),
                Genre = txtGenre.Text.Trim(),
                Producer = txtProducer.Text.Trim(),
                Price = int.Parse(txtPrice.Text.Trim())
            };
            bool result = gameService.AddNew(newGame);
            if (result)
            {
                List<bsite.Game> games = gameService.GetAll().ToList();
                dgvGame.DataSource = games;
            }
            else { MessageBox.Show("Hong be oi!"); }
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            bsite.Game newGame = new bsite.Game()
            {
                ID = int.Parse(txtID.Text.Trim()),
                Name = txtName.Text.Trim(),
                Genre = txtGenre.Text.Trim(),
                Producer = txtProducer.Text.Trim(),
                Price = int.Parse(txtPrice.Text.Trim())
            };
            bool result = gameService.Update(newGame);
            if (result)
            {
                List<bsite.Game> games = gameService.GetAll().ToList();
                dgvGame.DataSource = games;
            }
            else { MessageBox.Show("Hong be oi!"); }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            DialogResult dialogResult = MessageBox.Show("ARE YOU SURE?", "CONFIRMATION", MessageBoxButtons.YesNo);
            if (dialogResult == DialogResult.Yes)
            {
                int ID = int.Parse(txtID.Text);
                bool result = gameService.Delete(ID);
                if (result)
                {
                    List<bsite.Game> games = gameService.GetAll().ToList();
                    dgvGame.DataSource = games;
                }
                else
                {
                    MessageBox.Show("Hong be oi!");
                }
            }
        }
    }
}
