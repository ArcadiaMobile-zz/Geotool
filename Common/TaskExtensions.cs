using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Extensions for the Task and Task used with LINQ
    /// </summary>
    public static class TaskExtensions
    {
        public static async Task<IEnumerable<TResult>> Select<T, TResult>(this IEnumerable<T> source, Func<T, Task<TResult>> selector)
        {
            return await Task.WhenAll(Enumerable.Select(source, selector)).ConfigureAwait(false);
        }

        public static async Task<T[]> ToArray<T>(this Task<IEnumerable<T>> source)
        {
            return (await source.ConfigureAwait(false)).ToArray();
        }

        public static async Task<IEnumerable<T>> AsEnumerable<T>(this Task<T[]> source)
        {
            return await source.ConfigureAwait(false);
        }

        public static async Task<IEnumerable<TResult>> Select<T, TResult>(this Task<IEnumerable<T>> source, Func<T, Task<TResult>> selector)
        {
            return await (await source.ConfigureAwait(false)).Select(selector);
        }
    }
}
