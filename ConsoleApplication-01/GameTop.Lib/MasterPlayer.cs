using GameTOP.Interfaces;

namespace GameTop.Lib
{
    public class MasterPlayer : IPlayer
    {
        private string Nome { get; set; }        

        public MasterPlayer(string nome = "Maradona")
        {
            Nome = nome;
        }

        public string Chutar()
        {
            return $"Master {Nome} está Chutando";
        }

        public string Correr()
        {
            return $"Master {Nome} está Correndo";
        }

        public string Passar()
        {
            return $"Master {Nome} está Passando";
        }
    }
}