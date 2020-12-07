using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Interfaces
{
    public interface ICidadeService
    {
        Cidade Get(Guid id);
        IEnumerable<Cidade> List();
        IEnumerable<Cidade> ListByUf(string uf);
        IEnumerable<Cidade> Query(string terms);
    }
}
