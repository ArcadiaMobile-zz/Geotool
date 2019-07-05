using Ninject;
using Ninject.Activation.Caching;
using Ninject.Infrastructure.Disposal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    public class ContextScope : IDisposable, INotifyWhenDisposed
    {
        private readonly IKernel _kernel;

        private ContextScope(IKernel kernel)
        {
            _kernel = kernel;
        }

        internal static ContextScope Current
        {
            get
            {
                return (ContextScope)CallContext.LogicalGetData(nameof(ContextScope));
            }
            private set
            {
                CallContext.LogicalSetData(nameof(ContextScope), value);
            }
        }

        public bool IsDisposed { get; private set; }

        protected virtual void OnDisposed(EventArgs e)
        {
            Disposed?.Invoke(this, e);
        }

        public event EventHandler Disposed;

        /// <summary>
        /// Create a new context with IDisposable pattern in order to close it when needed
        /// </summary>
        /// <returns></returns>
        public static IDisposable Create()
        {
            return Create(null);
        }

        /// <summary>
        /// Create a new context with IDisposable pattern in order to close it when needed
        /// </summary>
        /// <returns></returns>
        public static IDisposable Create(IKernel kernel)
        {
            return Current = new ContextScope(kernel);
        }

        /// <summary>Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.</summary>
        /// <filterpriority>2</filterpriority>
        public void Dispose()
        {
            if (_kernel != null)
                _kernel.Components.Get<ICache>().Clear(this);
            Current = null;
            IsDisposed = true;
            OnDisposed(EventArgs.Empty);
        }
    }
}
