using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fretefy.Test.WebApi.Requests
{
    public class AddRegiaoRequest
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Nome { get; set; }
        
        public bool Ativa { get; set; }

        [Required(ErrorMessage = "É obrigatório selecionar no mínimo uma cidade.")]
        public IEnumerable<string> Cidades { get; set; }
    }
}