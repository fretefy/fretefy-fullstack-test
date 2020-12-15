using Fretefy.Test.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.Domain.Interfaces.Repositories
{
    public interface IRegiaoRepository
    {
        Regiao Add(Regiao entity);
        Regiao Update(Regiao entity);
        IQueryable<Regiao> List();
        IQueryable<Regiao> ListWithCidades();
        IEnumerable<Regiao> Query(string terms);
    }
}
