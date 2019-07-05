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
    /// Implementation of IAppConfiguration based on Ninject
    /// </summary>
    public class AppConfiguration : IDisposable, IAppConfiguration
    {
        private readonly StandardKernel _kernel;
        private IBindingNamedWithOrOnSyntax<IAppConfiguration> _bindingSyntaxResult;

        /// <summary>
        /// Creates an instance of the configuration
        /// </summary>
        public AppConfiguration()
            : this(null)
        {

        }

        /// <summary>
        /// Creates an instance of the configuration using a specific scope
        /// </summary>
        /// <param name="setupScope"></param>
        public AppConfiguration(Func<IBindingWhenInNamedWithOrOnSyntax<IAppConfiguration>, IBindingNamedWithOrOnSyntax<IAppConfiguration>> setupScope)
        {
            _kernel = new StandardKernel();

            _kernel.Bind<ISerializerFactory, DefaultSerializerFactory>().To<DefaultSerializerFactory>().InSingletonScope();
            var bindingSyntax = _kernel.Bind<IAppConfiguration>().ToConstant((IAppConfiguration)this);
            if (setupScope != null)
                _bindingSyntaxResult = setupScope(bindingSyntax);

            _kernel.Rebind<IAppConfiguration>().ToConstant(this).InTransientScope();
        }

        /// <summary>Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.</summary>
        /// <filterpriority>2</filterpriority>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~AppConfiguration()
        {
            Dispose(false);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                _kernel.Dispose();
            }
        }

        /// <summary>
        /// Gets the dependency container by the app
        /// </summary>
        public IKernel Kernel
        {
            get { return _kernel; }
        }

        /// <summary>
        /// Configures the binding in order to use an instance scope for the current app instance
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="binding"></param>
        void IAppConfiguration.SetupScope<T>(IBindingInSyntax<T> binding)
        {
            if (_bindingSyntaxResult != null)
                binding.BindingConfiguration.ScopeCallback = c => _bindingSyntaxResult.BindingConfiguration.ScopeCallback(c);
        }
    }
}
