
const arrayOfActions = (arr) => arr.map((item) => item.name);
const containsFileSar = (arr) => {
  const actionsName = arrayOfActions(arr);
  return actionsName.includes("File SAR");
};

const sarReport =  (batch,isRunning,isStale,resolveOffset,heartbeat) => {
    const allCurrentCases = [...batch.messages];
      const proceedData = () => {
          const results = [];
        allCurrentCases.map((message,index) => {
            if (!isRunning() || isStale()) return
            results.push(JSON.parse(message.value.toString()));
            resolveOffset(message.offset);
            (async() => {
                await heartbeat()
              })()
        });
        return results
      }
      const data = proceedData()[0];
      console.log("data.....",data)
      const caseIdentifierArrThatIsClosedAndActionContainsFileSar = data?.filter(
          (messageObject) =>
            messageObject?.message &&
            messageObject.message.type === "CLOSE-CASE" &&
            containsFileSar(messageObject.message.actions)
        )
        .map((el) => el.message.caseIdentifier);
      const getUniqueCaseIdentiFier = [
        ...new Set(caseIdentifierArrThatIsClosedAndActionContainsFileSar),
      ];
      const allCloseCase = data.filter(
        (item) => item.message.type === "CLOSE-CASE"
      );
      const allCreateCase = data.filter(
        (item) => item.message.type === "CREATE_CASE"
      );
      const eventsThatAreClosedAndActionContainsFileSar = () => {
        const results = [];
        for (let i = 0; i < allCreateCase.length; i++) {
          for (let caseIdentifier of getUniqueCaseIdentiFier) {
            if (allCreateCase[i].message.caseIdentifier === caseIdentifier) {
              results.push(allCreateCase[i]);
            }
          }
        }
        return results;
      };
      const listOfValidInvestigations = eventsThatAreClosedAndActionContainsFileSar();
      const dataToBeReported = listOfValidInvestigations.map(message => {
        let currentClosedCase = allCloseCase.find(item => item.message.caseIdentifier === message.message.caseIdentifier);
          return {
            originatingEvent: message.message.alerts[0].event,
            eventTime: message.message.alerts[0].event.eventTime,
            accountId: message.message.alerts[0].event.accountId,
            comment: currentClosedCase.message.comment || "",
            eventConclusionTime: currentClosedCase.message.timestamp || "",
            reporter: currentClosedCase.message.user.username || "",
            reasons: currentClosedCase.message.reasons || [],
            caseIdentifier: message.message.caseIdentifier,
            status:"Pending"
          }
      })
      return dataToBeReported
}

module.exports = sarReport