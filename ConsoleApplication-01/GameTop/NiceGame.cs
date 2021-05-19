using GameTOP.Interfaces;

namespace GameTOP
{
    public class NiceGame
    {
        private readonly IPlayer _jogador1;
        private readonly IPlayer _jogador2;

        public NiceGame(IPlayer jogador1, IPlayer jogador2) {
            this._jogador1 = jogador1;
            this._jogador2 = jogador2;
        }

        public void IniciarJogo()
        {
           System.Console.WriteLine(_jogador1.Chutar());
           System.Console.WriteLine(_jogador2.Correr());
           System.Console.WriteLine(_jogador1.Passar());
        }
    }}