using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.Infra.EntityFramework.Repositories
{
    public class RegiaoRepository : IRegiaoRepository
    {
        private DbSet<Regiao> _dbSet;
        private DbContext _dbContext;

        public RegiaoRepository(DbContext dbContext)
        {
            _dbSet = dbContext.Set<Regiao>();
            _dbContext = dbContext;
        }

        public Regiao Add(Regiao entity)
        {
            _dbSet.Add(entity);
            _dbContext.Entry(entity).State = EntityState.Added;
            _dbContext.SaveChanges();
            return entity;
        }

        public Regiao Update(Regiao entity)
        {
            _dbSet.Update(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return entity;
        }

        public IQueryable<Regiao> List()
        {
            return _dbSet.AsQueryable();
        }

        public IQueryable<Regiao> ListWithCidades()
        {
            return _dbSet.AsQueryable().Include(x => x.Cidades);
        }

        public IEnumerable<Regiao> Query(string terms)
        {
            return _dbSet.Where(w => EF.Functions.Like(w.Nome, $"%{terms}%"));
        }
    }
}
