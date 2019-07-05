using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ArcadiaMobile.ThinkBig.Common.Configuration
{
    public static class NinjectExtensions
    {
        /// <summary>
        /// Custom scope used for web requests
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="syntax"></param>
        /// <returns></returns>
        public static Ninject.Syntax.IBindingNamedWithOrOnSyntax<T> InCustomRequestScope<T>(this Ninject.Syntax.IBindingInSyntax<T> syntax)
        {
            return syntax.InScope(ctx => (object)ContextScope.Current ?? HttpContext.Current?.Request);
        }

    }
}
