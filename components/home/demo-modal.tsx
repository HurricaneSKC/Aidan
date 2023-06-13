import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [showDemoModal, setShowDemoModal] = useState(false);

  const DemoModalCallback = useCallback(() => {
    // Simulating fetching data based on the search query
    const searchResults: SearchResult[] = [{
      "name": "Urinary Tract Infection",
      "description": "A urinary tract infection (UTI) is an infection in any part of your urinary system — your kidneys, ureters, bladder and urethra. Most infections involve the lower urinary tract — the bladder and the urethra.",
      "url": "/uti-form",
    },
    {
      "name": "Hypertension",
      "description": "Hypertension (HTN or HT), also known as high blood pressure (HBP), is a long-term medical condition in which the blood pressure in the arteries is persistently elevated. High blood pressure typically does not cause symptoms.",
      "url": "/hypertension-form",
    }];

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
