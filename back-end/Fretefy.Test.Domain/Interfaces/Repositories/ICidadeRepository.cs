using Fretefy.Test.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.Domain.Interfaces.Repositories
{
    public interface ICidadeRepository
    {
        IQueryable<Cidade> List();
        IEnumerable<Cidade> ListByUf(string uf);
        IEnumerable<Cidade> Query(string terms);
    }
}
