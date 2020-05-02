#include <stdio.h>
#include <string.h>
#include <list>
#include <utility>
#include <time.h>
#include <stdlib.h>
using namespace std;

const pair<int, int> drs[4] = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
const int MN = 20, MC = 6, MM = 20;
int mb[MN + 1][MN + 1], cc;
bool vis[MN + 1][MN + 1];
void pt() {
	for (int i = 0; i < MN; i ++) {
		for (int j = 0; j < MN; j ++) {
			printf("%d ", mb[i][j]);
		}
		printf("\n");
	}
}
inline bool can(pair<int, int> u) {
	return 0 <= u.first && u.first < MN && 0 <= u.second && u.second < MN;
}
int main() {
	srand(time(0));
	for (int i = 0; i < MN; i ++) {
		for (int j = 0; j < MN; j ++) {
			mb[i][j] = rand() % MC + 1;
		}
	}
	mb[0][0] = cc = 1;

	bool win = false;
	for (int mv = 0; mv < MM; mv ++) {
		pt();
		printf("moves left: %d\n", MM - mv);
		printf("choose a color: ");
		int nc;
		scanf("%d", &nc);
		list<pair<int, int>> que;
		que.push_back({0, 0});
		for (int i = 0; i < MN; i ++) {
			memset(vis[i], false, sizeof(vis[i]));
		}
		vis[0][0] = true;
		mb[0][0] = nc;
		int ct = 1;
		while (!que.empty()) {
			pair<int, int> fr = que.front();
			que.pop_front();
			for (int d = 0; d < 4; d ++) {
				pair<int, int> ne = {fr.first + drs[d].first, fr.second + drs[d].second};
				if (can(ne) && !vis[ne.first][ne.second]) {
					vis[ne.first][ne.second] = true;
					if (mb[ne.first][ne.second] == cc || mb[ne.first][ne.second] == nc) {
						mb[ne.first][ne.second] = nc;
						que.push_back(ne);
						ct ++;
					}
				}
			}
		}
		if (ct == MN * MN) {
			win = true;
			break;
		}
		cc = nc;
	}
	pt();
	if (win) {
		printf("You Win!\n");
	}
	else {
		printf("You Lost!\n");
	}
	return 0;
}
