// let Students = {
//   teamCount: 4,

//   data: [
//     {
//       studentId: 201911111,
//       name: "AAA",
//       sumWeight: 100,
//     },
//     {
//       studentId: 201922222,
//       name: "BBB",
//       sumWeight: 100,
//     },
//     {
//       studentId: 201933333,
//       name: "CCC",
//       sumWeight: 60,
//     },
//     {
//       studentId: 201944444,
//       name: "DDD",
//       sumWeight: 50,
//     },
//     {
//       studentId: 201955555,
//       name: "EEE",
//       sumWeight: 26,
//     },
//     {
//       studentId: 201966666,
//       name: "FFF",
//       sumWeight: 20,
//     },
//     {
//       studentId: 201977777,
//       name: "GGG",
//       sumWeight: 10,
//     },
//     {
//       studentId: 201988888,
//       name: "HHH",
//       sumWeight: 9,
//     },
//     {
//       studentId: 201999999,
//       name: "III",
//       sumWeight: 8,
//     },
//     {
//       studentId: 201912121,
//       name: "JJJ",
//       sumWeight: 7,
//     },
//     {
//       studentId: 201923232,
//       name: "KKK",
//       sumWeight: 6,
//     },
//     {
//       studentId: 201934343,
//       name: "LLL",
//       sumWeight: 5,
//     },
//     {
//       studentId: 201945454,
//       name: "MMM",
//       sumWeight: 4,
//     },
//     {
//       studentId: 201956565,
//       name: "NNN",
//       sumWeight: 3,
//     },
//     {
//       studentId: 201967676,
//       name: "OOO",
//       sumWeight: 2,
//     },
//     {
//       studentId: 201978787,
//       name: "PPP",
//       sumWeight: 1,
//     },
//   ],
// };

//팀 클래스
class Team {
  constructor() {
    this.team = [];
    this.teamWeight = 0;
    this.NumOfMem = 0;
  }

  addStudent(obj) {
    this.team.push(obj);
    this.teamWeight += obj.sumWeight;
    this.NumOfMem++;
  }
  getTeamWeight() {
    return this.teamWeight;
  }
}

//팀 최소힙 클래스
class MinHeap {
  constructor() {
    this.teams = [];
  }

  //값을 서로 바꾸는 메소드
  swap(index1, index2) {
    let temp = this.teams[index1]; // items의 index1의 값을 temp(임시공간)에 담음
    this.teams[index1] = this.teams[index2]; // index1에 index2의 값을 저장
    this.teams[index2] = temp; // index2에 아까 index1의 값을 temp에 넣어놓은 값을 저장
  }

  //왼쪽 자식 인덱스 구하는 메소드
  leftChildIndex(index) {
    return index * 2 + 1;
  }

  //오른쪽 자식 인덱스 구하는 메소드
  rightChildIndex(index) {
    return index * 2 + 2;
  }

  //왼쪽 자식 노드 구하는 메소드
  leftChild(index) {
    return this.teams[this.leftChildIndex(index)];
  }

  //오른쪽 자식 노드 구하는 메소드
  rightChild(index) {
    return this.teams[this.rightChildIndex(index)];
  }

  //힙의 크기(항목 개수)를 반환하는 메소드
  size() {
    return this.teams.length;
  }

  //최소힙 정렬하기
  heaping(index) {
    if (this.leftChild(index) !== undefined) {
      if (this.rightChild(index) !== undefined) {
        if (
          this.teams[index].teamWeight > this.leftChild(index).teamWeight ||
          this.teams[index].teamWeight > this.rightChild(index).teamWeight
        ) {
          let smallerIndex =
            this.leftChild(index).teamWeight < this.rightChild(index).teamWeight
              ? this.leftChildIndex(index)
              : this.rightChildIndex(index);
          this.swap(index, smallerIndex);
          this.heaping(smallerIndex);
        }
      } else {
        if (this.teams[index].teamWeight > this.leftChild(index).teamWeight) {
          let smallerIndex = this.leftChildIndex(index);
          this.swap(index, smallerIndex);
          this.heaping(smallerIndex);
        }
      }
    }
  }

  //팀 추가
  addTeam(obj) {
    this.teams.unshift(obj);
  }

  //팀 스코어 가장 작은 팀에 학생 추가
  addStu(obj) {
    this.teams[0].addStudent(obj);
  }

  //팀 다 맞춰졌으면 뽑기
  poll() {
    this.teams[0] = this.teams.pop();
  }
}

class getTeams {
  constructor(StudentList) {
    this.StudentList = StudentList;
    this.teamWeight = [];
  }
  getWeights() {
    return this.teamWeight;
  }
  getTeams() {
    let teamlist = [];

    let sortStudents = this.StudentList.data.sort(
      (a, b) => a.sumWeight - b.sumWeight
    ); //배열 정렬

    //만들려고 하는 팀 수보다 학생수가 적으면 팀을 만들수 없어서
    //에러 처리를 해주었습니다. 콘솔이 아니라 팝업창을 띄운다던가 하면 더 좋을듯합니다
    let teamCount = this.StudentList.teamCount;
    if (teamCount < sortStudents.lenght) console.log("팀을 만들 수 없습니다");

    let TeamHeap = new MinHeap();
    let overTeam = sortStudents.length % teamCount; //학생 수가 안맞을 때, 학생이 1명 더 많은 팀 수
    let NumOfMember = parseInt(sortStudents.length / teamCount); //팀당 학생 수
    //성적 가장 높은 학생 한명씩 넣기
    
    let tempteamlist = [];
    for (let i = 0; i < teamCount; i++) {
      let team = new Team();
      team.addStudent(sortStudents.pop());
      tempteamlist.unshift(team);
      TeamHeap.addTeam(team);
    }
    //남은 학생 차례로 넣기
    let len = sortStudents.length;
    for (var i = 0; i < len; i++) {
      if (overTeam > 0) {
        if (TeamHeap.teams[0].NumOfMem === NumOfMember + 1) {
          TeamHeap.poll();
          overTeam--;
          TeamHeap.heaping(0);
          i--;
        } else {
          TeamHeap.heaping(0);
          TeamHeap.addStu(sortStudents.pop());
        }
      } else {
        if (TeamHeap.teams[0].NumOfMem === NumOfMember) {
          TeamHeap.poll();
          TeamHeap.heaping(0);
          i--;
        } else {
          TeamHeap.heaping(0);
          TeamHeap.addStu(sortStudents.pop());
        }
      }
    }
    
    //최종 팀 총점, 팀 리스트 구하기
    let FinalTeams = [];
    for (let i = 0; i < teamCount; i++)
      {
        FinalTeams.push(tempteamlist[i].getTeamWeight());
        FinalTeams.push(tempteamlist[i].team);
        teamlist.unshift(FinalTeams);
        FinalTeams = [];
      }
    
    return teamlist;
  }
}

export default getTeams;
