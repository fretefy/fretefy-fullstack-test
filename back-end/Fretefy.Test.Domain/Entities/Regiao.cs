using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Entities
{
    public class Regiao : IEntity
    {
        public Regiao()
        {

        }

        public Regiao(string nome, bool ativa)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Ativa = ativa;
            Cidades = new List<RegiaoCidade>();
        }

        public Guid Id { get; set; }

        public string Nome { get; set; }

        public bool Ativa { get; set; }

        public ICollection<RegiaoCidade> Cidades { get; set; }
    }
}
