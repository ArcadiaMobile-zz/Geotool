using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    public interface IStreamWithContentType : IHeaderData
    {
        Stream Stream { get; }
    }
}
