using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Interfaces
{
    public interface IRegiaoService
    {
        Regiao Add(Regiao entity);
        Regiao Update(Regiao entity);
        Regiao Get(Guid id);
        Regiao GetWithCidades(Guid id);
        IEnumerable<Regiao> List();
        IEnumerable<Regiao> Query(string terms);
    }
}
