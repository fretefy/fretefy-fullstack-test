using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Fretefy.Test.WebApi.Requests
{
    public class UpdateRegiaoStatusRequest
    {
        [Required(ErrorMessage = "O id é obrigatório.")]
        public string Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Nome { get; set; }
        public bool Ativa { get; set; }
    }
}