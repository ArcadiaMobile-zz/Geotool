using Ninject;
using Ninject.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common.Configuration
{
    /// <summary>
    /// Configuration and dependencies used by the app
    /// </summary>
    public interface IAppConfiguration
    {
        /// <summary>
        /// Gets the dependency container by the app
        /// </summary>
        IKernel Kernel { get; }

        /// <summary>
        /// Configures the binding in order to use an instance scope for the current app instance
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="binding"></param>
        void SetupScope<T>(IBindingInSyntax<T> binding);
    }

}
