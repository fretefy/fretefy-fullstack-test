using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Entities
{
    public class RegiaoCidade : IEntity
    {
        public RegiaoCidade()
        {

        }

        public RegiaoCidade(Guid regiaoId, Guid cidadeId)
        {
            Id = Guid.NewGuid();
            RegiaoId = regiaoId;
            CidadeId = cidadeId;
        }

        public Guid Id { get; set; }

        public Guid RegiaoId { get; set; }

        public Guid CidadeId { get; set; }
    }
}
