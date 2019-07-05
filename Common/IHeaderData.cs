using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    public interface IHeaderData
    {
        System.Net.Mime.ContentType ContentType { get; set; }

        string ContentDisposition { get; set; }
    }
}
