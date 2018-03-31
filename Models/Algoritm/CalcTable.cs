using System.Collections.Generic;

namespace CoreReactRedux.Algoritm {
    public class CalcTable {
        List<List<int>> distances;
        List<int> volumes;
        int maxVolume, midleIndex;
        int minDistance = int.MaxValue;
        List<int> bestWayList;
        public CalcTable(List<List<int>> distances, List<int> volumes) {
            this.distances = distances;
            this.volumes = volumes;
            this.maxVolume = volumes[0];
        }
        public List<int> CalcOutValues() {
            int totalVolume = 0, totalDistance = 0;
            int volumesLeft = 0;
            midleIndex = (distances.Count - 1) / 2;
            List<int> totalWayList = new List<int>();
            List<int> possiblePointsList = new List<int>();
            for(int i = midleIndex + 1; i < distances.Count; i++) {
                for(int j = midleIndex + 1; j < distances.Count; j++) {
                    if(i != j)
                        possiblePointsList.Add(j);
                }
                totalWayList.Add(0);
                CalcOtherPointsDistances(totalDistance + distances[0][i], totalVolume + volumes[i], volumesLeft, totalWayList, possiblePointsList, i);
                totalWayList.Clear();
                possiblePointsList.Clear();
            }
            return bestWayList;
        }
        bool CalcOtherPointsDistances(int totalDistance, int totalVolume, int volumesLeft, List<int> totalWayList, List<int> possiblePointsList, int nextIndex) {
            List<int> currentTotalWayList = new List<int>(totalWayList);
            List<int> currentPossiblePointsList = new List<int>(possiblePointsList);
            currentTotalWayList.Add(nextIndex);
            UpdatePossiblePointList(currentPossiblePointsList, currentTotalWayList);
            for(int i = 0; i < currentPossiblePointsList.Count; i++) {
                if(maxVolume < totalVolume + volumes[currentPossiblePointsList[i]])
                    continue;
                int delta = distances[nextIndex][currentPossiblePointsList[i]];
                int deltaVolume = volumes[i];
                if(currentTotalWayList.Count == distances.Count - 1) {
                    currentTotalWayList.Add(currentPossiblePointsList[i]);
                    delta += distances[currentTotalWayList[currentTotalWayList.Count - 1]][0];
                    currentTotalWayList.Add(0);
                    CheckMinimum(totalDistance + delta, currentTotalWayList);
                    return false;
                }
                CalcOtherPointsDistances(totalDistance + delta, totalVolume + volumes[currentPossiblePointsList[i]], volumesLeft, currentTotalWayList, currentPossiblePointsList, currentPossiblePointsList[i]);
            }
            return false;
        }
        void CheckMinimum(int totalDistance, List<int> totalWayList) {
            if(totalDistance > minDistance) return;
            minDistance = totalDistance;
            bestWayList = totalWayList;
        }
        void UpdatePossiblePointList(List<int> possiblePointList, List<int> totalVisitedList) {
            possiblePointList.Remove(totalVisitedList[totalVisitedList.Count - 1]);
            if(totalVisitedList[totalVisitedList.Count - 1] - midleIndex > 0)
                possiblePointList.Add(distances.Count - totalVisitedList[totalVisitedList.Count - 1]);
            if(possiblePointList.Count == 0)
                possiblePointList.Add(0);
        }
    }
}