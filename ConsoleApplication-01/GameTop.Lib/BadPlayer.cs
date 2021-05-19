using GameTOP.Interfaces;

namespace GameTop.Lib
{
    public class BadPlayer : IPlayer
    {
        private string Nome { get; set; }

        public BadPlayer(string nome = "Maradona")
        {
            this.Nome = nome;
        }

        public string Chutar()
        {
            return $"{Nome} errou ao Chutar";
        }

        public string Correr()
        {
            return $"{Nome} errou ao Correr";
        }

        public string Passar()
        {
            return $"{Nome} errou ao Passar";
        }
    }
}