using Fretefy.Test.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fretefy.Test.Infra.EntityFramework.Mappings
{
    public class RegiaoCidadeMap : IEntityTypeConfiguration<RegiaoCidade>
    {
        public void Configure(EntityTypeBuilder<RegiaoCidade> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.RegiaoId).IsRequired();
            builder.Property(p => p.CidadeId).IsRequired();

            builder.HasIndex(i => i.CidadeId).IsUnique(false);
            builder.HasIndex(i => i.RegiaoId).IsUnique(false);
        }
    }
}
