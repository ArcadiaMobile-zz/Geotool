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
    /// Wrapper on existing IAppConfiguration
    /// </summary>
    public class AppConfigurationWrapper : IAppConfiguration, IDisposable
    {
        private IAppConfiguration _appConfiguration;

        /// <summary>
        /// Creates an instance wrapping the IAppConfiguration passed
        /// </summary>
        /// <param name="appConfiguration"></param>
        public AppConfigurationWrapper(IAppConfiguration appConfiguration)
        {
            Guard.ThrowIfNull(appConfiguration, "appConfiguration");

            this._appConfiguration = appConfiguration;
        }

        /// <summary>
        /// Gets the dependency container by the app
        /// </summary>
        IKernel IAppConfiguration.Kernel
        {
            get { return _appConfiguration.Kernel; }
        }

        /// <summary>
        /// Configures the binding in order to use an instance scope for the current app instance
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="binding"></param>
        void IAppConfiguration.SetupScope<T>(IBindingInSyntax<T> binding)
        {
            _appConfiguration.SetupScope(binding);
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    if (_appConfiguration is IDisposable)
                        ((IDisposable)_appConfiguration).Dispose();
                }
                disposedValue = true;
            }
        }

        ~AppConfigurationWrapper()
        {
            Dispose(false);
        }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
