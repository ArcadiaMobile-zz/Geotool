using System;
using System.Diagnostics;
using System.Runtime.CompilerServices;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Utility used to check parameters values and throw eventually an exception.
    /// </summary>
    [DebuggerStepThrough]
    public static class Guard
    {
        /// <summary>
        /// Throws if less equal zero.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="name">The name.</param>
        /// <exception cref="System.ArgumentException"></exception>
        public static void ThrowIfLessEqualZero(int value, [CallerMemberName]string name = null)
        {
            if (value <= 0)
                throw new ArgumentException(name);
        }

        /// <summary>
        /// Throws if value is null.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="name">The name.</param>
        /// <exception cref="System.ArgumentNullException"></exception>
        public static void ThrowIfNull(object item, [CallerMemberName]string name = null)
        {
            if (item == null)
                throw new ArgumentNullException(name);
        }

        /// <summary>
        /// Throws if the string is null or empty.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="name">The name.</param>
        /// <exception cref="System.ArgumentNullException">Value cannot be null or empty</exception>
        public static void ThrowIfNullOrEmpty(string item, [CallerMemberName]string name = null)
        {
            if (String.IsNullOrWhiteSpace(item))
                throw new ArgumentNullException(name, "Value cannot be null or empty");
        }

        /// <summary>
        /// Throws if the string exceed the max length.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="maxLength">The maximum length.</param>
        /// <param name="name">The name.</param>
        /// <exception cref="System.ArgumentException"></exception>
        public static void ThrowIfExceed(string item, int maxLength, [CallerMemberName]string name = null)
        {
            if (item != null && item.Length > maxLength)
                throw new ArgumentException(String.Format("Parameter must {0} characters", maxLength), name);
        }
    }
}
