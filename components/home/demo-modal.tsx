import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import getUrls from "@/app/api/collections";

interface SearchResult {
  name: string;
  description: string;
  url: string;
}

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
  searchResults: SearchResult[];
}) => {
  const handleResultClick = (result: string) => {
    setSearchQuery(result);
    setShowDemoModal(false);
  };
  
  console.log('Search results:', searchResults);
  
  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full bg-white overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl p-4">
        <h3 className="font-display text-2xl font-bold">Results</h3>
        {searchResults.map((result, i) => (
          <div key={i} onClick={() => handleResultClick(result.name)}>
            <Link href={result.url}>
              {result.name}
            </Link>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export function useDemoModal(searchQuery: string, setSearchQuery: Dispatch<SetStateAction<string>>) {
  const [collectionNames, setCollectionNames] = useState([]);
  const [showDemoModal, setShowDemoModal] = useState(false);
  
    useEffect(() => {
      getUrls()
        .then((data:any) => {
          setCollectionNames(data);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        })
  }, []);

  const DemoModalCallback = useCallback(() => {
    // Simulating fetching data based on the search query
    const searchResults: SearchResult[] = collectionNames;


    return (
      <DemoModal
        showDemoModal={showDemoModal}
        setShowDemoModal={setShowDemoModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
      />
    );
  }, [collectionNames, showDemoModal, searchQuery, setSearchQuery]);

  return useMemo(
    () => ({ setShowDemoModal, DemoModal: DemoModalCallback }),
    [setShowDemoModal, DemoModalCallback],
  );
}
