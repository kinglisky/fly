/**
 * 给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。设计一个算法使得这 m 个子数组各自和的最大值最小。

注意:
数组长度 n 满足以下条件:

1 ≤ n ≤ 1000
1 ≤ m ≤ min(50, n)
示例:

输入:
nums = [7,2,5,10,8]
m = 2

输出:
18

解释:
一共有四种方法将nums分割为2个子数组。
其中最好的方式是将其分为[7,2,5] 和 [10,8]，
因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/split-array-largest-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
    const len = nums.length;
    const sumList = Array(len + 1).fill(0);
    const dp = Array.from({ length: len + 1 }, () => Array(m + 1).fill(Number.MAX_VALUE));

    // 逐位增加，反面后面根据区间求区间和
    for (let i = 0; i < len; i++) {
        sumList[i + 1] = sumList[i] + nums[i];
    }

    // 默认值
    dp[0][0] = 0;

    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= Math.min(m, i); j++) {
            // 前i个数分成j段
            for (let x = j - 1; x < i; x++) {
                // x最后一段的起点
                // perv本轮分割完成 分段中最大的和
                let prev = Math.max(dp[x][j - 1], sumList[i] - sumList[x])
                // 该分割情况下最大分段和的最小值
                dp[i][j] = Math.min(prev, dp[i][j])
            }
        }
    }

    return dp[len][m]
};
