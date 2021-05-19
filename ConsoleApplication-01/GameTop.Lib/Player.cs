using GameTOP.Interfaces;
namespace GameTop.Lib
{
public class Player : IPlayer
    {
        private string Nome { get; set; }

        public Player(string nome = "Ronaldo")
        {
            Nome = nome;
        }

        public string Chutar()
        {
            return $"{Nome} está Chutando";
        }

        public string Correr()
        {
            return $"{Nome} está Correndo";
        }

        public string Passar()
        {
            return $"{Nome} está Passando";
        }
    }  
}