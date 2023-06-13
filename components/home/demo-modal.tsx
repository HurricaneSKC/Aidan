import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";


const DemoModal = ({
  showDemoModal,
  setShowDemoModal,
  searchQuery,
  setSearchQuery,
  searchResults,
}: {
  showDemoModal: boolean;
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchResults: string[];
}) => {
  const handleResultClick = (result: string) => {
    setSearchQuery(result);
    setShowDemoModal(false);
  };

  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl p-4">
      <h3 className="font-display text-2xl font-bold">Results</h3>
        {searchResults.map((result, i) => (
          <div key={i} onClick={() => handleResultClick(result)}>
            <a href="#">
            {result}  
            </a>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export function useDemoModal(searchQuery: string, setSearchQuery: Dispatch<SetStateAction<string>>) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  const DemoModalCallback = useCallback(() => {
    // Simulating fetching data based on the search query
    const searchResults = ["Urinary Tract Form", "Result 2", "Result 3"]; 

    return (
      <DemoModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
      />
    );
  }, [showDemoModal, setShowDemoModal, searchQuery, setSearchQuery]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback],
  );
}
