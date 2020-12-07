using Fretefy.Test.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fretefy.Test.Infra.EntityFramework.Mappings
{
    public class CidadeMap : IEntityTypeConfiguration<Cidade>
    {
        public void Configure(EntityTypeBuilder<Cidade> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Nome).HasMaxLength(1024).IsRequired();
            builder.Property(p => p.UF).HasMaxLength(2).IsRequired();

            builder.HasData(
                new Cidade("Rio Branco", "AC"),
                new Cidade("Maceió", "AL"),
                new Cidade("Macapá", "AP"),
                new Cidade("Manaus", "AM"),
                new Cidade("Salvador", "BA"),
                new Cidade("Fortaleza", " CE"),
                new Cidade("Brasília", "DF"),
                new Cidade("Vitória", "ES"),
                new Cidade("Goiânia", "GO"),
                new Cidade("São Luís", "MA"),
                new Cidade("Cuiabá", "MT"),
                new Cidade("Campo Grande", "MS"),
                new Cidade("Belo Horizonte", "MG"),
                new Cidade("Belém", "PA"),
                new Cidade("João Pessoa", "PB"),
                new Cidade("Curitiba", "PR"),
                new Cidade("Recife", "PE"),
                new Cidade("Teresina", "PI"),
                new Cidade("Rio de Janeiro", "RJ"),
                new Cidade("Natal", "RN"),
                new Cidade("Porto Alegre", "RS"),
                new Cidade("Porto Velho", "RO"),
                new Cidade("Boa Vista", "RR"),
                new Cidade("Florianópolis", "SC"),
                new Cidade("São Paulo", "SP"),
                new Cidade("Aracaju", "SE"),
                new Cidade("Palmas", "TO")
            );
        }
    }
}
