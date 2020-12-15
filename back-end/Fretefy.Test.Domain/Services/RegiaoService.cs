using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces;
using Fretefy.Test.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Fretefy.Test.Domain.Services
{
    public class RegiaoService : IRegiaoService
    {
        private readonly IRegiaoRepository _regiaoRepository;

        public RegiaoService(IRegiaoRepository regiaoRepository)
        {
            _regiaoRepository = regiaoRepository;
        }

        public Regiao Add(Regiao entity)
        {
            return _regiaoRepository.Add(entity);
        }

        public Regiao Update(Regiao entity)
        {
            return _regiaoRepository.Update(entity);
        }

        public Regiao Get(Guid id)
        {
            return _regiaoRepository.List().FirstOrDefault(f => f.Id == id);
        }

        public Regiao GetWithCidades(Guid id)
        {
            return _regiaoRepository.ListWithCidades().FirstOrDefault(f => f.Id == id);
        }


        public IEnumerable<Regiao> List()
        {
            return _regiaoRepository.List();
        }

        public IEnumerable<Regiao> Query(string terms)
        {
            return _regiaoRepository.Query(terms);
        }
    }
}
