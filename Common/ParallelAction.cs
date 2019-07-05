using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace ArcadiaMobile.ThinkBig.Common
{
    /// <summary>
    /// Parallel utility
    /// </summary>
    public static class ParallelAction
    {
        /// <summary>
        /// Runs each action in parallel
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="source"></param>
        /// <param name="eachAction"></param>
        /// <param name="completedAction"></param>
        /// <param name="maxDegreeOfParallelism"></param>
        /// <returns></returns>
        public static Task RunAsync<T>(IEnumerable<T> source, Func<T, Task> eachAction, Action<T> completedAction, int maxDegreeOfParallelism)
        {
            return RunAsync<T, T>(source, async r => { await eachAction(r); return r; }, completedAction, maxDegreeOfParallelism);
        }

        /// <summary>
        /// Runs each action in parallel
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="source"></param>
        /// <param name="eachAction"></param>
        /// <param name="completedAction"></param>
        /// <param name="maxDegreeOfParallelism"></param>
        /// <returns></returns>
        public static async Task RunAsync<T, TResult>(IEnumerable<T> source, Func<T, Task<TResult>> eachAction, Action<TResult> completedAction, int maxDegreeOfParallelism)
        {
            if (completedAction == null) completedAction = p => { };

            // Action to collect results of each row
            var actionBlock = new ActionBlock<TResult>(completedAction, new ExecutionDataflowBlockOptions
            {
                MaxDegreeOfParallelism = 1
            });
            // Execute in parallel up to n requests
            // Apply Polly policy in order to retry
            var transformBlock = new TransformBlock<T, TResult>(new Func<T, Task<TResult>>(async p => await eachAction(p)),
                new ExecutionDataflowBlockOptions
                {
                    MaxDegreeOfParallelism = maxDegreeOfParallelism,
                });
            transformBlock.LinkTo(actionBlock, new DataflowLinkOptions { PropagateCompletion = true });

            // Add all rows to processs
            foreach (var p in source)
            {
                transformBlock.Post(p);
            }
            // Mark the transform as completed (means there are no other rows)
            transformBlock.Complete();

            // Wait actionBlock to complete and receive all results
            await actionBlock.Completion;
        }
    }
}
