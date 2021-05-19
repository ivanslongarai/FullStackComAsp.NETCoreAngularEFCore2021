using GameTop.Lib;

namespace GameTOP
{
    class Program
    {

        static void Main(string[] args)
        {
            var jogo = new NiceGame(new Player("Ivan"), new BadPlayer("Ronaldo"));
            jogo.IniciarJogo();
        }                       
    }
     
}
