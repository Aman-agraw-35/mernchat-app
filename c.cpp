#include <stdio.h>
// #include <unistd.h>
#include <stdlib.h>
#include <time.h>
#include <sys/types.h>
// #include <sys/wait.h>

#define MIN_SIZE 50
#define MAX_SIZE 100

int *A;

int getMax(int l, int r) {
  int max = -1;
  for (int i = l; i <= r; ++i)
    max = max > A[i] ? max : A[i];
  return max;
}

int recurFindMax(int l, int r) {
  if (r - l < 10) {
    printf("Current process: %u, Parent process: %u\n", getpid(), getppid());
    return getMax(l, r);
  }

  int pid1, pid2, status1, status2;

  if ((pid1 = fork()) == 0)
    exit(recurFindMax(l, (l + r) / 2));
  else {
    if ((pid2 = fork()) == 0)
      exit(recurFindMax((l + r) / 2 + 1, r));
    else {
      waitpid(pid1, &status1, 0);
      waitpid(pid2, &status2, 0);
      status1 = WEXITSTATUS(status1);
      status2 = WEXITSTATUS(status2);

      printf("Current process: %u, Parent process: %u\n", getpid(), getppid());
      return status1 > status2 ? status1 : status2;
    }
  }
}

int main(int argc, char *argv[]) {
  if (argc != 2) {
    printf("Usage: %s <size_of_array>\n", argv[0]);
    return 1;
  }

  int n = atoi(argv[1]);
  if (n < MIN_SIZE || n > MAX_SIZE) {
    printf("The value of n should be between %d and %d\n", MIN_SIZE, MAX_SIZE);
    return 1;
  }

  A = (int *)malloc(n * sizeof(int));
  srand((unsigned int)time(NULL));

  for (int i = 0; i < n; ++i)
    A[i] = rand() % 128;

  printf("A[] = ");
  for (int i = 0; i < n; ++i)
    printf("%d ", A[i]);
  printf("\n");

  int res = recurFindMax(0, n - 1);
  printf("The maximum value in the array is %d\n", res);

  free(A);
  return 0;
}
