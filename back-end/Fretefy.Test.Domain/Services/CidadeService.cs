using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces;
using Fretefy.Test.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fretefy.Test.Domain.Services
{
    public class CidadeService : ICidadeService
    {
        private readonly ICidadeRepository _cidadeRepository;

        public CidadeService(ICidadeRepository cidadeRepository)
        {
            _cidadeRepository = cidadeRepository;
        }

        public Cidade Get(Guid id)
        {
            return _cidadeRepository.List().FirstOrDefault(f => f.Id == id);
        }

        public IEnumerable<Cidade> List()
        {
            return _cidadeRepository.List();
        }

        public IEnumerable<Cidade> ListByUf(string uf)
        {
            return _cidadeRepository.ListByUf(uf);
        }

        public IEnumerable<Cidade> Query(string terms)
        {
            return _cidadeRepository.Query(terms);
        }
    }
}
