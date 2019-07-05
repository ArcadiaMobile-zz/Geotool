using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    public interface IEntity
    {
        string Key { get; set; }
    }

    public interface IEntityVisibility
    {
        bool IsPublic { get; }
    }
}
