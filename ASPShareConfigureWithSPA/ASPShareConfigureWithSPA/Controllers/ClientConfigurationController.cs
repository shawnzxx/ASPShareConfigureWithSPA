using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPShareConfigureWithSPA.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ASPShareConfigureWithSPA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientConfigurationController : ControllerBase
    {
        ClientConfiguration clientConfig;
        public ClientConfigurationController(IOptions<ClientConfiguration> clientConfigOptions)
        {
            clientConfig = clientConfigOptions?.Value;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return Ok(clientConfig);
        }
    }
}