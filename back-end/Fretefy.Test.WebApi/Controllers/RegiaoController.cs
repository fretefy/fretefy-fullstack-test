using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces;
using Fretefy.Test.WebApi.Requests;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.WebApi.Controllers
{
    [Route("api/regiao")]
    [ApiController]
    public class RegiaoController : ControllerBase
    {
        private readonly IRegiaoService _regiaoService;

        public RegiaoController(IRegiaoService regiaoService)
        {
            _regiaoService = regiaoService;
        }

        [HttpGet]
        public IActionResult List([FromQuery] string terms)
        {
            IEnumerable<Regiao> regioes;

            if (!string.IsNullOrEmpty(terms))
                regioes = _regiaoService.Query(terms);
            else
                regioes = _regiaoService.List();

            return Ok(regioes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var regiao = _regiaoService.GetWithCidades(id);
            return Ok(regiao);
        }

        [HttpPost]
        public IActionResult Add([FromBody] AddRegiaoRequest data)
        {
            var duplicated = _regiaoService.Query(data.Nome);
            if (duplicated.ToList().Count > 0)
            {
                return BadRequest("Este nome já está em uso");
            }

            var regiao = new Regiao(data.Nome, true);

            foreach (var item in data.Cidades)
            {
                var cidade = new RegiaoCidade()
                {
                    Id = Guid.NewGuid(),
                    RegiaoId = regiao.Id,
                    CidadeId = new Guid(item)
                };

                regiao.Cidades.Add(cidade);
            }

            _regiaoService.Add(regiao);
            return Ok();
        }

        [HttpPut]
        public IActionResult Edit([FromBody] UpdateRegiaoRequest data)
        {
            var regiao = _regiaoService.GetWithCidades(new Guid(data.Id));
            regiao.Nome = data.Nome;
            
            _regiaoService.Update(regiao);
            return Ok();
        }

        [HttpPut("status")]
        public IActionResult Edit([FromBody] UpdateRegiaoStatusRequest data)
        {
            var regiao = _regiaoService.Get(new Guid(data.Id));
            if (regiao != null)
            {
                regiao.Ativa = data.Ativa;
                _regiaoService.Update(regiao);
            }
            return Ok();
        }
    }
}
